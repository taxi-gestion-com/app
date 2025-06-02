import { Feature, FeatureCollection, Point } from 'geojson';
import { Effect, pipe, Ref } from 'effect';

type Address = {
  id: string;
  label: string;
  city: string;
  citycode: string;
  housenumber: string;
  postcode: string;
  street: string;
  x: number;
  y: number;
};

type AddressProperties = {
  banId: string;
  city: string;
  citycode: string;
  context: string;
  district?: string;
  housenumber: string;
  id: string;
  importance: number;
  label: string;
  name: string;
  postcode: string;
  score: number;
  street: string;
  type: string;
  x: number;
  y: number;
};

type AddressFeature = Feature<Point, AddressProperties>;

type AddressFeatureCollection = FeatureCollection<Point, AddressFeature['properties']>;

const INPUT_MIN_LENGTH = 3;

const INPUT_DEBOUNCE_DELAY = 300;

const lastInputRef = Ref.unsafeMake('');

const fetchSuggestionsEffect = (input: string): Effect.Effect<AddressFeature[], Error> =>
  Effect.tryPromise({
    try: () =>
      fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(input)}`)
        .then((res: Response): Promise<AddressFeatureCollection> => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json();
        })
        .then(({ features }: AddressFeatureCollection) => features),
    catch: (error: unknown) => new Error(`Fetch failed: ${error}`)
  });

const loadSuggestions = (input: string): Promise<AddressFeature[]> =>
  input.trim().length < INPUT_MIN_LENGTH
    ? Promise.resolve([])
    : Effect.runPromise(
        pipe(
          Ref.set(lastInputRef, input),
          Effect.flatMap(() => Effect.sleep(INPUT_DEBOUNCE_DELAY)),
          Effect.flatMap(() => Ref.get(lastInputRef)),
          Effect.flatMap((latestInput: string) => (latestInput !== input ? Effect.succeed([]) : fetchSuggestionsEffect(input)))
        )
      );

const itemToString = (item: AddressFeature | null): string => (item ? item.properties.label : '');

const valueToString = (item: Address): string => item.label;

const itemToValue = ({ properties, geometry: { coordinates } }: AddressFeature): Address => ({
  ...properties,
  street: [properties.housenumber, properties.street].filter((streetPart) => streetPart != null).join(' '),
  x: coordinates[1] ?? 0,
  y: coordinates[0] ?? 0
});

const itemToKey = (item: AddressFeature): string => item.properties.id;

const valueToKey = (value: Address): string => value.id;

const renderItem = ({ item }: { item: AddressFeature }) => <span>{itemToString(item)}</span>;

export const addressCombobox = {
  itemToValue,
  itemToString,
  valueToString,
  loadSuggestions,
  itemToKey,
  valueToKey,
  renderItem
};

export const DEFAULT_ADDRESS: Address = {
  id: '',
  label: '',
  city: '',
  citycode: '',
  housenumber: '',
  postcode: '',
  street: '',
  x: 0,
  y: 0
};

export const DEFAULT_ADDRESSES: Address[] = [];

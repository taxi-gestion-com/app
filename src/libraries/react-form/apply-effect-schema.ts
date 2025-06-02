import { Either, ParseResult, Schema } from 'effect';
import { Left, Right } from 'effect/Either';
import { type ArrayFormatterIssue, ParseError } from 'effect/ParseResult';

type StandardErrors = Record<string, { message: ArrayFormatterIssue['message']; type: ArrayFormatterIssue['_tag'] }[]>;

const EMPTY_ERRORS: StandardErrors = {};

const errorKeyAt =
  (index: number) =>
  (path: readonly PropertyKey[]): string =>
    path.slice(0, index + 1).join('.');

const errorsIn =
  ({ path, message, _tag: type }: ArrayFormatterIssue) =>
  (error: StandardErrors, _: unknown, index: number): StandardErrors => ({
    ...error,
    [errorKeyAt(index)(path)]: [{ message, type }]
  });

const toStandardError = (errors: StandardErrors, arrayFormatterIssue: ArrayFormatterIssue): StandardErrors => ({
  ...errors,
  ...arrayFormatterIssue.path.reduce(errorsIn(arrayFormatterIssue), {})
});

const toStandardErrors = (errors: ArrayFormatterIssue[]): StandardErrors => errors.reduce(toStandardError, EMPTY_ERRORS);

const errorsFrom = <TFormData>(result: Left<ParseError, TFormData> | Right<ParseError, TFormData>) =>
  Either.isRight(result) ? {} : toStandardErrors(ParseResult.ArrayFormatter.formatErrorSync(result.left));

export const applyEffectSchema =
  <TFormData>(schema: Schema.Schema<TFormData>) =>
  ({ value }: { value: TFormData }) => ({
    fields: errorsFrom(Schema.decodeEither(schema, { errors: 'all' })(value))
  });

import { Either, ParseResult, Schema } from 'effect';
import { Left, Right } from 'effect/Either';
import { type ArrayFormatterIssue, ParseError } from 'effect/ParseResult';

type StandardErrors = Record<string, { message: ArrayFormatterIssue['message']; type: ArrayFormatterIssue['_tag'] }>;

const EMPTY_ERRORS: StandardErrors = {};

const toStandardError = (errors: StandardErrors, { path, message, _tag: type }: ArrayFormatterIssue): StandardErrors => ({
  ...errors,
  [path.join('.')]: { message, type }
});

const toStandardErrors = (errors: ArrayFormatterIssue[]): StandardErrors => errors.reduce(toStandardError, EMPTY_ERRORS);

const errorsFrom = <TFormData>(result: Left<ParseError, TFormData> | Right<ParseError, TFormData>) =>
  Either.isRight(result) ? {} : toStandardErrors(ParseResult.ArrayFormatter.formatErrorSync(result.left));

export const applyEffectSchema =
  <TFormData>(schema: Schema.Schema<TFormData>) =>
  ({ value }: { value: TFormData }) => ({
    fields: errorsFrom(Schema.decodeEither(schema, { errors: 'all' })(value))
  });

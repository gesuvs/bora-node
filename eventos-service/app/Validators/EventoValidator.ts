import { schema, validator, rules } from '@ioc:Adonis/Core/Validator';

class EventoValidator {
  /**
   * Using a pre-compiled schema you can validate the "shape", "type",
   * "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ inTable: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = validator.compile(
    schema.create({
      name: schema.string({ trim: true }),
      owner: schema.string({ trim: true }),
      roles: schema.enumSet([
        'public',
        'private',
        'only frinds',
        'only friends of friends',
      ]),
    })
  );

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   */
  public messages = {
    'name.required': 'Please enter evento name',
    'owner.required': 'Please enter evento owner',
  };
}

export default new EventoValidator();

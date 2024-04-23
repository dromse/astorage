// graphql for minimalists :)
module.exports = class UserDto {
  id;
  username;
  email;
  role;

  constructor(model) {
    this.id = model.id;
    this.username = model.username;
    this.email = model.username;
    this.role = model.role;
  }
};

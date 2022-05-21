module.exports = Object.freeze({
  ADMIN: 'ADMIN',
  USER: 'USER',
  GUEST: 'GUEST',
})

// roles GUEST -> no authorizated user, can only listen to public audio
// roles USER -> authorizated user, can only listen to public and own private audios, and access by link.
// roles ADMIN -> user with all permissions, for listen private, public and access_link_only


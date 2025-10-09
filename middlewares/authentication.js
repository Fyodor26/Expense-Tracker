const express = require("express");
const { verifyToken } = require("../service/authentication");

function checkAuthentication(cookieName) {
  return (req, res, next) => {
    const tokenValue = req.cookies[cookieName];
    if (!tokenValue) return next();
    try {
      const payload = verifyToken(tokenValue);
      req.user = payload;
    } catch (err) {}
    return next();
  };
}

module.exports = { checkAuthentication };

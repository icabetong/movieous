const assert = require('assert');

export const generate = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = ''
    for (let i = 0; i < 20; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    assert(id.length === 20);
    return id;
}
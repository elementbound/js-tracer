const zip = (a,b) => 
    a.map((_,i) => [a[i], b[i]])

module.exports = {
    zip
}

## InstaGIS jQuery Helper

This helper bundles jQuery library plus all its plugins our app uses in
one monolythic file. 

It comes in two flavors: 

- `jquery_helper.js` : jQuery, some jQuery UI components, jQuery plugins
- `jquery_helper_extended.js`: the former plus Bootstrap3, Select2 and DataTables

After changing anything, remember to build before committing and tagging a new version

```sh
make build
make build-extended
```

Then tag and push to github

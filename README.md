
## InstaGIS jQuery Helper

Este helper encapsula jQuery + sus plugins en un solo bundle monolitico.
Esto no incluye plugins que se usan en landings particulares o de los cuales
coexisten varias versiones (datatables, bootstrap2, bootstrap3, select2)

Para generar el build después de algún cambio, correr:

```sj
jspm bundle-sfx src/jquery_helper dist/jquery_helper.js --format amd --skip-source-maps
```

Luego taggear, subir a github y actualizar en las apps que lo requieran

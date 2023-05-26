const lockJson = require('./package-lock.json'); // edit path if needed

const libraries = [];

// Loop through dependencies keys (as it is an object)
Object.keys(lockJson.dependencies).forEach((dependencyName) => {
  const dependencyData = lockJson.dependencies[dependencyName];
    if (['next', 'prop-types', 'react', 'react-dom', '@mui/material', '@mui/icons-material', '@emotion/styled','@emotion/server', '@emotion/react', '@emotion/cache', 'eslint', 'eslint-config-next'].includes(dependencyName)) {
        libraries.push({
          libName: dependencyName,
          libVersion: dependencyData.version,
          parent: null,
        });

    }

  // Loop through requires subdependencies      
//   if (dependencyData.requires) {
//     Object.keys(dependencyData.requires).forEach((subdependencyName) => {
//       const subdependencyVersion = dependencyData.requires[subdependencyName];

//       libraries.push({
//         libName: subdependencyName,
//         libVersion: subdependencyVersion,
//         parent: dependencyName,
//       });
//     });
//   }
});

console.log(libraries);
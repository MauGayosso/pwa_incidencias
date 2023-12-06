const username = 'api';
const apiKey = 'hkDwJKeSmOTFlIt8FYPZU7W9ftCmoEAnGPiZKIe728b5KpL1hqvdaW7tqxVDT0Io';
const groupId = '62f40a8dec29fe22917dc10a';
const clusterName = 'market';
const databaseName = 'incidencias';
const collectionName = 'reportes';

const apiUrl = `https://cloud.mongodb.com/api/atlas/v2.0/groups/${groupId}/clusters/${clusterName}/database/${databaseName}/collections/${collectionName}/find`;
console.log(apiUrl);

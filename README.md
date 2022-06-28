The Client folder is client files, and the Server folder is server files.  

docker run --name timemanagerdb  -p 27017:27017 -v $(pwd)/TimeManagerDB:/data/db  mongo 

# 运行mongod 
mongod --dbpath ~/mongodbData/timemanager
# 恢复数据库数据
mongorestore -h localhost:27017 -d timemanager ~/Documents/TimeManagerDataDump

# 运行client
yarn dev 
# 运行server
yarn start





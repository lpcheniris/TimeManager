The Client folder is client files, and the Server folder is server files.  

docker run -d --name timemanager -p 27017:27017 --rm mongo

# 运行mongod 
mongod --dbpath ~/mongodbData

# 运行client
yarn dev 
# 运行server
yarn start

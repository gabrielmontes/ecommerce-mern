# Mern ecommerce - microservices - kubernetes.

Hello world,

The following app relates to my graduation project 
for bachelor's degree in systems engineering (Universidad Hispanoamerica) Costa Rica.


## Documentation

The application has been designed using the following technologies:

- MongoDB
- ExpressJS
- ReactJS
- NodeJS
- Kubernetes
- Docker
- Microservices

Basically, I created 3 microservices: Users, Products, Orders.
The services use REST to handle business logic, also,
I've used RabbitMQ to comunicate services, and MongoDB for the database.

I will be adding more features as I'm moving the project from 
docker-compose to kubernetes.
## Installation

```bash
# If you are running WSL and kubernetes (docker desktop) run the following:
# Local dev only:
mkdir /mnt/wsl/project-name
sudo mount --bind project-name-path /mnt/wsl/project-name

# Copy and paste the following output
# into MONGO_URI value: kubernetes/secrets.yaml 
echo -n mongodb://database:27017/ecommerce?directConnection=true | base64

# Same for JWT_SECRET
echo -n SECRET | base64

# Create kubernetes namespace:
kubectl create namespace ecommerce

# Apply deployments and secret:
for deployment in $(find .); do
  echo "Applying deployment: ${deployment}"
  kubectl apply -f $deployment;
done
```

## Contributing

Contributions are always welcome!

Fork as you'd like.


## License

[MIT](https://choosealicense.com/licenses/mit/)



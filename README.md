# Mern ecommerce - microservices - kubernetes.

Hi world,

The following app relates to my graduation project 
for bachelor's degree in systems engineering. 


## Documentation

The application has been designed using REST microservices as follows:

- Users
- Orders
- Products

Also, I've used RabbitMQ to comunicate services, and MongoDB for
the database.

I will be adding more features as I'm moving the project from 
docker-compose to kubernetes.
## Installation

```bash
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



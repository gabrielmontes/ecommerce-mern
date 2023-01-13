import Product from '../models/productModel.js'

const UpdateProductQuantity = async(message) => {
  const {
    product,
    qty
  } = message;

  const newProduct = await Product.findById(product);

  if (!newProduct) {
    throw new Error('El producto no ha sido encontrado');
  };

  if (newProduct.countInStock < 0){
    throw new Error('No hay disponibles')
  }

  const newCount = newProduct.countInStock - qty;
  newProduct.countInStock = newCount;

  const updatedProduct = await newProduct.save();
  console.log(`The product: ${updatedProduct._id} has been updated.`);
};

export default UpdateProductQuantity;
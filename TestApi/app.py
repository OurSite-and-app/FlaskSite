from flask import Flask, jsonify
app=Flask(__name__)

from products import products

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({"message": "pong!"})

@app.route('/products')
def getProducts():
    return jsonify({"myproducts":products,"message":"Product's List"})

@app.route('/products/<string:product_name>') #хотим получить часть запроса
def getProduct(product_name):
    productsFound=[product for product in products if product['name']== product_name]
    return jsonify({"product": productsFound[0]})



if __name__ =='__main__':
    app.run(debug=True,port=4000)

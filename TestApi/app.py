from flask import Flask, jsonify, request
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
    if (len(productsFound)>0):
        return jsonify({"product": productsFound[0]})
    return jsonify({"message":"Product not found"})


@app.route('/products',methods=['POST'])
def addProduct():
    #print(request.json)
    new_product={
        "name":request.json["name"],
        "price":request.json["price"],
        "quantity":request.json["quantity"]
    }
    products.append(new_product)
    return jsonify({"message":"Product added succsesfully","products are":products})

if __name__ =='__main__':
    app.run(debug=True,port=4000)

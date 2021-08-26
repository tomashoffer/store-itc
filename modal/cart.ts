export class Cart{
    productName:string;
    productDescription:string;
    productImage?: File;
    productPrice:number;
    id: string
    constructor(productName: string, productDescription: string, productImage: File, productPrice: number, id: string) {
        (this.productName = productName), 
        (this.productDescription = productDescription), 
        (this.productImage = productImage),
        (this.productPrice = productPrice);
        (this.id = id);
      }
}
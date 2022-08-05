export interface searchProductDto {
  //seachPage에서 사용하는 각 상품Dto
  title: string;
  imageUrl: string;
  minimumPrice: number;
  url: string;
}

export interface detailProductDto {
  //detailPage에서 사용하는 상품상세 Dto
  title: string;
  minimumPrice: string;
  url: string;
  image: string;
  mallDtoInfo: mallInfoDto[];
}

interface mallInfoDto {
  //특정 상품에 대한 mallInfoDto
  delivery: number;
  interestFree: string;
  link: string;
  name: string;
  paymentOption: string;
  price: number;
}

export interface registedProductDto {
  // //상품 알림 등록 페이지에서 사용하는 Dto
  productId: string;
  name: string;
  image: string;
  mallInfo: mallInfoDto[];
}

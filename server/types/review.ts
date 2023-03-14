type Review = {
  _id?: string,
  username?:string;
  bookId:string,
  rating: number,
  comment?: string,
};

export default Review;

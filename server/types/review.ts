type Review = {
  username?:string;
  bookId:string,
  rating: number,
  comment?: string,
};

export default Review;

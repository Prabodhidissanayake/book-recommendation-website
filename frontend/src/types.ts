type Book = {
  id: string;
  title: string;
  authors: string[];
  publisher: string;
  description: string;
  imageLinks:{
    smallThumbnail:string
  };
};

export default Book;

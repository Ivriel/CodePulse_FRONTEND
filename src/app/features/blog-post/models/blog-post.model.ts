export interface BlogPost {
    id:string;
    title:string;
    shortDescription:string;
    content:string;
    featuredImagesUrl:string;
    urlHandle:string;
    author:string;
    publishedDate:Date;
    isVisible:boolean;
}
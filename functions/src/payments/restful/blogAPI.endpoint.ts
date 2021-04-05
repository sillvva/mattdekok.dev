import { Request, Response } from "express";
import { Endpoint, RequestType } from "firebase-backend";
import { initializeApp, storage } from "firebase-admin";
import { load } from "js-yaml";

const app = initializeApp({}, "matt-dekok-dev");
const bucket = storage(app).bucket("matt-dekok-dev.appspot.com");

export default new Endpoint("blogAPI", RequestType.GET, async (req: Request, res: Response) => {
  try {
    const files = await bucket.getFiles({ directory: "blog/articles" });
    if (req.query.slug) {
      const file = files[0].find(file => file.name.includes(`/${req.query.slug}.md`));
      if (!file) throw new Error("Post not found");
      const post: string = await new Promise(resolve => {
        if (file.name.includes(".md")) {
          let fileContent = "";
          file
            .createReadStream()
            .on("data", chunk => {
              fileContent += chunk.toString();
            })
            .on("end", () => {
              resolve(fileContent);
            });
        }
      });

      const parts = post.split("---");

      res.statusCode = 200;
      res.json({
        slug: req.query.slug,
        ...(<any>load(parts[1])),
        text: post
      });
    } else {
      const files = await bucket.getFiles({ directory: "blog/articles" });
      const fileCount = files[0].filter(file => file.name.includes(".md")).length;
      const fileData: any[] = await new Promise(resolve => {
        const data: any[] = [];
        for (let i = 0; i < files[0].length; i++) {
          const file = files[0][i];
          if (file.name.includes(".md")) {
            let fileContent = "";
            file
              .createReadStream()
              .on("data", chunk => {
                fileContent += chunk.toString();
              })
              .on("end", () => {
                const parts = fileContent.split("---");
                data.push({
                  slug: file.name.replace(/blog\/articles\/|\.md/g, ""),
                  ...(<any>load(parts[1])),
                });
                if (data.length >= fileCount) resolve(data);
              });
          }
        }
      });

      res.statusCode = 200;
      res.json({
        posts: fileData.sort((a, b) => (a.date > b.date ? -1 : 1)),
      });
    }
  } catch (err) {
    res.statusCode = 500;
    res.json({
      error: err,
    });
  }
});

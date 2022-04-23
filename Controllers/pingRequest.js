const axios = require("axios");
require("dotenv").config();

//Request the data to the server api
exports.getRequests = async (req, res, next) => {
  let { tags = "tech", sortBy = "id", direction = "asc" } = req.query;

  const reqTags = []; // hold all the define url with tags

  const sortValue = ["id", "reads", "likes", "popularity"];
  const directionValue = ["asc", "desc"];

  //check the existence of tag parameter
  if (!tags) {
    const error = new Error("The tag parameter is required");
    error.status = 400;
    throw error;
  }

  tags = tags.split(",");

  //check if the sortBy parameter is listed in  the default sort value
  //console.log("isSortExist: " + isSortExist);
  if (!sortBy && !sortValue.includes(sortBy)) {
    const error = new Error("SortBy parameter is invalid || does't exists");
    res.status = 400;
    throw error;
  }

  if (!direction && !directionValue.includes(direction)) {
    const error = new Error("Direction parameter is invalid || does't exists");
    res.status = 400;
    throw error;
  }

  //if more than two tags specify with comma
  // //check and push in the params of request
  for (const tag of tags) {
    reqTags.push(
      process.env.URL +
        `?tag=${tag}` +
        `&sortBy=${sortBy}` +
        `&direction=${direction}`
    );
  }

  //instantiate the request --don't forget to perform
  // concurrent request with qxios
  await Promise.all(
    reqTags.map(async (urlTags) => {
      const result = await axios.get(urlTags);
      return result; //it's possible to do so here
    })
  )
    .then(function (resp) {
      //the result of my Promise is and array
      //for memory consuming i prefer to loop here
      let isUnique = [];

      for (datas of resp) {
        filterData([...datas.data.posts]);
      }
      //const cp = [...datas];
      //console.log(datas);

      //check if i have two same element and remove one
      function filterData(datas) {
        //console.log(datas);
        isUnique = datas.filter((val) => {
          const isDuplicate = isUnique.includes(val.authorId);

          if (!isDuplicate) {
            isUnique.push(val.authorId);

            return true;
          }
        });
      }

      res.statusCode = 201;
      res.json({ "Response Body (JSON)": isUnique });
      res.send();
    })
    .catch((err) => console.log(err));
};

// https
//   .get("https://api.hatchways.io/assessment/blog/posts?tags", (resp) => {
//     //receive a data in the req parameter
//     resp.on("data", (req) => {
//       Datas = JSON.parse(req);
//     });
//     res.write(Datas);
//     res.write(resp.statusCode);
//     res.send();
//   })
//   .on("error", (err) => {
//     if (err.message === "ERR_INVALID_ARG_TYPE") {
//       const Errors = new Error("Tags parameter is required");
//       res.statusCode(400);
//       throw Errors;
//     }
//   });

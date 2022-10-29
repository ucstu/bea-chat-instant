/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import fs from "fs";
import json from "./openapi.json";

function fix(json: any) {
  const keys = Object.keys(json);
  if (keys.includes("x-apifox")) {
    json["x-enum-varnames"] = Object.values(
      json["x-apifox"]["enumDescriptions"]
    );
  } else {
    for (const key of keys) {
      if (typeof json[key] === "object") {
        fix(json[key]);
      }
    }
  }
  if (keys.includes("title") && !keys.includes("description")) {
    json["description"] = json["title"];
  }
  return json;
}

fs.writeFileSync("openapi.json", JSON.stringify(fix(json), null, 2));

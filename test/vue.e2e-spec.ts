import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import * as request from "supertest"
import { AppModule } from "../src/module/app.module"
import { AddVueReq } from "../src/contract/vue"

const description =
  "description-hahahahahahadfddddddddddddddddd ssssssssssssss aaaaaaaaaaaaaaaaaa fffffffffffff bbbbbbbbbbbbbb vvvvvvvvvvvvvvv"

describe("Vue (e2e)", () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it("/addVue", () => {
    console.log("begin...")
    const param: AddVueReq = {
      user_id: 1,
      title: "vue1",
      feeling: description,
      resources: [
        { url: "url-ssssssssssssssssssssssaaaaaaaaaaaaaaaaaaa", description },
        {
          url: "url2-ssssssssssssssssssssssaaaaaaaaaaaaaaaaaaa",
          description,
          type: "video",
        },
      ],
      tags: [],
      music: "url-ssssssssssssssssssssssaaaaaaaaaaaaaaaaaaa",
    }
    return request(app.getHttpServer())
      .post("/addVue")
      .send(param)
      .expect(200)
  })
})

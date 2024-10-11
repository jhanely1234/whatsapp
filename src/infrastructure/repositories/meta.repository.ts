import "dotenv/config";
import axios from "axios";
import LeadExternal from "../../domain/lead-external.repository";

const META_TOKEN = process.env.META_TOKEN || "EAAO1cbhyooABOyPfCX2aY9uGO6zQ1ZA0299NELDzR8t0L2xfA1GwleI39AtYZAmF4mceHaZCxZApzXwioUIkjwZBr5jZC3WwmwPYNZAVoVNd8nzpPoWuaNFRSaweUrUozDD9GvzrOe9TiBFnkerXlfeXcdpzaqUsUfcDzKmCbBT9ZAWUV8AKYH0eU9QamCI8UQi3uLfPuHXPAxndrlnfDBtwKbqZA1nFXlqnmUEhqIE8HLtsZD";
const META_ID_NUMBER = process.env.META_ID_NUMBER || "374622355742980";
const URL = `https://graph.facebook.com/v13.0/${META_ID_NUMBER}/messages`;

export default class MetaRepository implements LeadExternal {
  async sendMsg({
    message,
    phone,
  }: {
    message: string;
    phone: string;
  }): Promise<any> {
    try{
        const body = this.parseBody({message, phone})
        const response = await axios.post(URL,body, {
          headers: {
            Authorization: `Bearer ${META_TOKEN}`,
          },
        }) as any;
    
        return response.data
    }catch(e){
        return Promise.resolve(e)
    }
  }

  private parseBody ({message, phone}:{message:string,phone:string}){
    const body = {
        "messaging_product": "whatsapp",
        "to": phone,
        "type": "template",
        "template": {
            "name": "hello_world",
            "language": {
                "code": "en_US"
            }
        }
    }
    return body
  }


}

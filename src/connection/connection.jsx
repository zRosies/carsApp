
import request, {gql} from 'graphql-request'

export const getCars  = async () => {
    const query = gql`
    query Cars {
        cars {
          carAvg
          carBrand
          createdAt
          id
          name
          price
          publishedAt
          updatedAt
          image{
            url
          }
        }
      }
    
    `
    const result = await request('https://api-sa-east-1.hygraph.com/v2/cloirfhpf0su701t71gcu135o/master',query)

    return result;
}
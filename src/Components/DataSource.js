import { parseString } from 'react-native-xml2js'
import { fetch } from 'fetch'

function fetchXml(uri) {
  return fetch(uri, {
    method: 'GET',
    headers: {
      'Accept': 'application/xml',
      'Content-Type': 'application/xml',
    }
  })
  .then(
    (response) => new Promise((resolve, reject) => {
      response.text()
        .catch(reject)
        .then((text) => parseString(text, (error, xml) => {
            if (error) {
              reject(error)
            } else {
              resolve(xml)
            }
          })
        )
    })
  )
}

export { fetchXml }

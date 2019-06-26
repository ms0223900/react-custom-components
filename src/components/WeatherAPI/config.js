export const taichung = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-073?Authorization=CWB-7CE23D86-293E-42EE-9745-B51DFD1A0C56'
export const tainan = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-077?Authorization=CWB-7CE23D86-293E-42EE-9745-B51DFD1A0C56'

const api = (dataId) => (
  `https://opendata.cwb.gov.tw/api/v1/rest/datastore/${ dataId }?Authorization=CWB-7CE23D86-293E-42EE-9745-B51DFD1A0C56`
)

export const API = [
  { city: 'taichung', api: api('F-D0047-073') },
  { city: 'tainan', api: api('F-D0047-077') },
]
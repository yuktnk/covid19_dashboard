import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../../app/store'
import dataJson from './data.json'
import dataDailyJson from './dataDaily.json'

const name = 'covid'
const apiUrl = 'https://covid19.mathdro.id/api'

type API_DATA = typeof dataJson
type API_DATA_DAILY = typeof dataDailyJson

type covidState = {
  data: API_DATA
  country: string
  dailyData: API_DATA_DAILY
}

const initialState: covidState = {
  data: dataJson,
  country: '',
  dailyData: dataDailyJson,
}

export const fetchAsyncGetTotal = createAsyncThunk(`${name}/get`, async () => {
  const { data } = await axios.get<API_DATA>(apiUrl)
  return data
})

export const fetchAsyncGetDaily = createAsyncThunk(
  `${name}/getDaily`,
  async () => {
    const { data } = await axios.get<API_DATA_DAILY>(`${apiUrl}/daily`)
    return data
  }
)

export const fetchAsyncGetCountry = createAsyncThunk(
  `${name}/getCountry`,
  async (country: string) => {
    let dinamicUrl = apiUrl
    if (country) {
      dinamicUrl = `${dinamicUrl}/countries/${country}`
    }
    const { data } = await axios.get<API_DATA>(dinamicUrl)
    return { data, country }
  }
)

const covidSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(fetchAsyncGetTotal.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload,
      }
    })
    builders.addCase(fetchAsyncGetDaily.fulfilled, (state, action) => {
      return {
        ...state,
        dailyData: action.payload,
      }
    })
    builders.addCase(fetchAsyncGetCountry.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload.data,
        country: action.payload.country,
      }
    })
  },
})

export const selectData = (state: RootState) => state.covid.data
export const selectDailyData = (state: RootState) => state.covid.dailyData
export const selectCountry = (state: RootState) => state.covid.country

export default covidSlice.reducer

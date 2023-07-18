import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

async function getCategories() {
    return await axios.get("http://localhost:3001/api/guest/categories/get_all")
        .then(data => data)
        .catch(error => alert(error))
}

const initialState = await getCategories();


export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {

    }
})
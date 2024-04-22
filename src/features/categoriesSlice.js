import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import
{fetchCategories,addCategorie,deleteCategorie,editCategorie,fetchCategorieById
} from "../services/CategorieService"
export const getCategories = createAsyncThunk(
"categorie/getCategories",
async (_, thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try {
const res = await fetchCategories();
return res.data;
}
catch (error) {
return rejectWithValue(error.message);
}
}
);
export const createCategories = createAsyncThunk(
"categorie/createCategorie",
async (Categories, thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
const res= await addCategorie(Categories);
return res.data
}
catch (error) {
return rejectWithValue(error.message);



}
}
);
export const deleteCategories = createAsyncThunk(
"categorie/deleteCategorie",
async (id,thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
await deleteCategorie(id);
return id ;
}
catch (error) {
return rejectWithValue(error.message);
}
});
export const updateCategories = createAsyncThunk(
"categorie/updateCategorie",
async (Categories, thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
const res= await editCategorie(Categories);
return res.data
}
catch (error) {
return rejectWithValue(error.message);
}
}
);
export const findCategoriesByID = createAsyncThunk(
"categorie/findCategorieByID",
async (id,thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
const res = await fetchCategorieById(id);
return res.data;
}
catch (error) {
return rejectWithValue(error.message);
}
});
export const categorieslice = createSlice({
name: 'categorie',
initialState:{
Categories:[],


Categories:{},
isLoading: false,
success:null,
error:null,
},

extraReducers: (builder) => {
//get Categories
builder
.addCase(getCategories.pending, (state, action) => {
state.isLoading=true;
state.error=null;
})
.addCase(getCategories.fulfilled, (state, action) => {
state.isLoading=false;
state.error = null;
state.Categories=action.payload;
})
.addCase(getCategories.rejected, (state, action) => {
state.isLoading=false;
state.error=action.payload;
console.log("impossible de se connecter au serveur")
})
//insertion Categories
.addCase(createCategories.pending, (state, action) => {
state.isLoading=true;
state.error=null;
state.success=null;
})
.addCase(createCategories.fulfilled, (state, action) => {
state.Categories.push(action.payload);
state.isLoading=false;
state.error=null;
state.success=action.payload;
})
.addCase(createCategories.rejected, (state, action) => {
state.isLoading=false;
state.error=action.payload;
state.success=null;
})
//Modification Categories
.addCase(updateCategories.pending, (state, action) => {
state.isLoading=true;
state.error=null;
state.success=null;



})
.addCase(updateCategories.fulfilled, (state, action) => {
state.Categories = state.Categories.map((item) =>
item._id === action.payload._id ? action.payload : item
);
state.isLoading=false;
state.error=null;
state.success=action.payload;
})
//Delete Categories
.addCase(deleteCategories.pending, (state, action) => {
state.isLoading=true;
state.error=null;
})
.addCase(deleteCategories.fulfilled, (state, action) => {
state.isLoading=false;
state.error=null;
state.Categories=state.Categories.filter((item)=>
item._id!==action.payload)
})
.addCase(deleteCategories.rejected, (state, action) => {
state.isLoading=false;
state.error=action.payload;
})
//Fectch Categories
.addCase(findCategoriesByID.pending, (state, action) => {
state.isLoading = true
state.error=null;
})
.addCase(
findCategoriesByID.fulfilled,(state, action) => {
state.isLoading = false
state.error = null
state.Categories=action.payload;
})
}
}
)

export default categorieslice.reducer;
import {
    Card,
    IconButton,
    Typography,
    TextField,
    CardContent,
    CardActions,
    Button,
    Grid,
    InputAdornment,
    MenuItem,
    Stack,
    Box
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import in project
import categoryApi from 'apis/category';
import productApi from 'apis/product';
import { conventRowSelect, convertToSlug } from 'utils/functions';

const CreateProduct = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [thumnail, setThumnail] = useState(undefined);
    const [reviewThumnail, setReviewThumnail] = useState(undefined);
    const [price, setPrice] = useState('');
    const [priceFormat, setPriceFormat] = useState('');
    const [description, setDescription] = useState('');
    const [quality, setQuality] = useState(1);
    const [category, setCategory] = useState('');
    const [dataCategory, setDataCategory] = useState([]);

    const handleSelectImage = (event) => {
        const img = event.target.files[0];
        const src = URL.createObjectURL(img);
        setReviewThumnail(src);
        setThumnail(img);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('slug', slug);
        formData.append('price', price);
        formData.append('thumnail', thumnail);
        formData.append('decscription', description);
        formData.append('quality', quality);
        formData.append('category', category);

        await productApi.addProduct(formData).then((res) => {
            if (res) {
                navigate('/products');
            }
        });
    };

    const handleChangeTitle = (event) => {
        setName(event.target.value);
        setSlug(convertToSlug(event.target.value));
    };

    const handleChangePrice = (event) => {
        const values = event.target.value;
        setPrice(values);
    };
    useEffect(() => {
        const fetchCategory = async () => {
            await categoryApi.getAll().then((res) => {
                setDataCategory(conventRowSelect(res));
                setCategory(res[0]._id);
            });
        };
        fetchCategory();
    }, []);
    return (
        <div>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        CREACT PRODUCT
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-basic"
                                label="Name"
                                name="name"
                                value={name}
                                fullWidth
                                sx={{ margin: '10px 0px' }}
                                onChange={handleChangeTitle}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-basic"
                                label="Slug"
                                name="slug"
                                value={slug}
                                sx={{ margin: '10px 0px' }}
                                fullWidth
                                onChange={(event) => setSlug(event.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <IconButton color="primary" aria-label="upload picture" component="label">
                                        <input onChange={handleSelectImage} hidden accept="image/*" type="file" />
                                        <PhotoCamera fontSize="large" />
                                    </IconButton>
                                </Stack>
                            </Box>
                            {reviewThumnail && <img style={{ width: '200px' }} src={reviewThumnail} alt="preview thumnail" />}
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-basic"
                                label="Price"
                                name="price"
                                type="number"
                                value={priceFormat}
                                sx={{ margin: '10px 0px' }}
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">VNĐ</InputAdornment>
                                }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Price"
                                name="price"
                                hidden
                                value={price}
                                sx={{ margin: '10px 0px' }}
                                fullWidth
                                onChange={handleChangePrice}
                                variant="outlined"
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">VNĐ</InputAdornment>
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-basic"
                                label="Quality"
                                name="quality"
                                type="number"
                                value={quality}
                                sx={{ margin: '10px 0px' }}
                                fullWidth
                                onChange={(event) => setQuality(event.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Category"
                                value={category}
                                fullWidth
                                sx={{ margin: '10px 0px' }}
                                onChange={(event) => setCategory(event.target.value)}
                            >
                                {dataCategory.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-basic"
                                label="Description"
                                name="description"
                                multiline
                                rows={4}
                                value={description}
                                sx={{ margin: '10px 0px' }}
                                fullWidth
                                onChange={(event) => setDescription(event.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleSubmit}>
                        Save
                    </Button>
                    <Button size="small">Close</Button>
                </CardActions>
            </Card>
        </div>
    );
};
export default CreateProduct;

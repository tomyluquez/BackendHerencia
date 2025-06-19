import { Request, Response } from "express";
import { ProductVM } from "../Models/ProductVM";
import {
    changeStatusService,
    getAllProductsService,
    getHomeInfoService,
    getPriceListProductsService,
    getProductByIdService,
    getProductsPagedListsService,
    getProductsService,
    getPromocionalProductsService,
    saveProductService,
    updateAllProductsPriceService,
    updatePriceProductService
} from "../Services/Products.Service";
import { PromotionalProductsVM } from "../Models/PromotionalProductsVM.model";
import { Errors } from "../../Text/Errors.Messages";
import { ProductPagedListVM } from "../Models/ProductPagedListVM";
import { ProductPagedListSearchDTO } from "../Dtos/ProductPagedListSearchDTO";
import { convertedFilters, convertedStatusFilter, convertedStatusNumberFilter } from "../../Other/Helpers/ConvertedFilters";
import { GetAllProductsSearchDTO } from "../Dtos/GetAllProductsSearchDTO";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { PriceListProductsVM } from "../Models/PriceListProductsVM";
import { FilteringOptionsPagedListProductVM } from "../Models/FilteringOptionsPagedListProductVM";
import { mapDataToNameAndId } from "../../Variant/Helpers/Maps/MapVariantsDBToVM";
import { mapPaginationQueryToDTO } from "../../Other/Helpers/Maps/Maps";
import { getAllCategoriesService } from "../../Category/Services/Categories.Service";
import { mapPriceListProductsSearchQueryToDTO, mapProductPagedListQueryToDTO, mapUpdateAllPriceProductBodyToDTO, mapUpdatePriceProductBodyToDTO } from "../Helpers/Maps/MapProducts";
import { FilteringOptionsPriceListVM } from "../Models/FilteringOptionsPriceListVM";
import { Products } from "../Models/Product";
import { HomeInfoResponse } from "../../Other/Models/HomeInfo.model";
import { mapCategoriesSearchQueryToDTO } from "../../Category/Helpers/Maps/MapCategory";

export const getProductsToSale = async (req: Request, res: Response): Promise<Products> => {
    const categories = convertedFilters(req.query.categories);
    const sizes = convertedFilters(req.query.sizes);
    const status = convertedStatusNumberFilter(Number(req.query.status));

    const search: ProductPagedListSearchDTO = mapProductPagedListQueryToDTO(req.query, categories, sizes, status);
    try {
        const response = await getProductsService(search);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new Products();
        response.setError(Errors.Products);
        res.status(500).send(response);
        return response;
    }
};

export const getPromocionalProducts = async (req: Request, res: Response): Promise<PromotionalProductsVM> => {

    const pagination = mapPaginationQueryToDTO(req.query);
    try {
        const response = await getPromocionalProductsService(pagination);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        let response = new PromotionalProductsVM();
        response.setError(Errors.Products);
        res.status(500).send(response);
        return response;
    }
};

export const getProductsPagedLists = async (req: Request, res: Response): Promise<ProductPagedListVM> => {
    const categories = convertedFilters(req.query.categories);
    const sizes = convertedFilters(req.query.sizes);
    const status = convertedStatusNumberFilter(Number(req.query.status));

    const search: ProductPagedListSearchDTO = mapProductPagedListQueryToDTO(req.query, categories, sizes, status);
    try {
        const response = await getProductsPagedListsService(search);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new ProductPagedListVM();
        response.setError(Errors.Products);
        res.status(500).send(response);
        return response;
    }
};

export const getProductById = async (req: Request, res: Response): Promise<ProductVM> => {
    const { id } = req.query;

    try {
        if (!id) {
            throw new Error(Errors.IdRequired);
        }
        const response = await getProductByIdService(+id);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new ProductVM();
        response.setError(error.message || Errors.Products);
        res.status(500).send(response);
        return response;
    }
};

export const changeStatuts = async (req: Request, res: Response): Promise<ResponseMessages> => {
    try {
        const { status, id } = req.query;
        if (!id) {
            throw new Error(Errors.IdRequired);
        }
        if (!status) {
            throw new Error(Errors.StatusRequired);
        }
        let IsActive = convertedStatusNumberFilter(Number(status))!;

        const response = await changeStatusService(+id, IsActive);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new ResponseMessages();
        response.setError(error.message || Errors.ProductChangeState);
        res.status(500).send(response);
        return response;
    }
};

export const saveProduct = async (req: Request, res: Response): Promise<ResponseMessages> => {
    const product = req.body;

    try {
        const response = await saveProductService(product);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new ProductVM();
        response.setError(error.message || Errors.Products);
        res.status(500).send(response);
        return response;
    }
};

export const getPriceListProducts = async (req: Request, res: Response): Promise<PriceListProductsVM> => {
    const search = mapPriceListProductsSearchQueryToDTO(req.query);
    try {
        const response = await getPriceListProductsService(search);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new PriceListProductsVM();
        response.setError(Errors.PriceListProducts);
        res.status(500).send(response);
        return response;
    }
};

export const updatePriceProduct = async (req: Request, res: Response): Promise<ResponseMessages> => {
    const toUpdate = mapUpdatePriceProductBodyToDTO(req.query);
    try {
        const response = await updatePriceProductService(toUpdate);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new PriceListProductsVM();
        response.setError(Errors.PriceListProducts);
        res.status(500).send(response);
        return response;
    }
};

export const updateAllProductsPrice = async (req: Request, res: Response): Promise<ResponseMessages> => {
    const toUpdate = mapUpdateAllPriceProductBodyToDTO(req.query);
    console.log(toUpdate);
    try {
        const response = await updateAllProductsPriceService(toUpdate);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new PriceListProductsVM();
        response.setError(Errors.PriceListProducts);
        res.status(500).send(response);
        return response;
    }
};

export const getFilteringOptionsPagedListProduct = async (req: Request, res: Response): Promise<FilteringOptionsPagedListProductVM> => {
    const response = new FilteringOptionsPagedListProductVM();
    try {
        const categories = await getAllCategoriesService({ IsActive: undefined, Pagination: { Page: 1, Limit: 1000 }, Name: "" })
        response.addCategories(mapDataToNameAndId(categories.Items))
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        response.setError(error.message || Errors.ProductVariants);
        res.status(500).send(response);
        return response;
    }
};

export const getFilteringOptionsPriceList = async (req: Request, res: Response): Promise<FilteringOptionsPriceListVM> => {
    const response = new FilteringOptionsPriceListVM();
    try {
        const categories = await getAllCategoriesService({ IsActive: true, Pagination: { Page: 1, Limit: 1000 }, Name: "" })
        response.addCategories(mapDataToNameAndId(categories.Items))
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        response.setError(error.message || Errors.ProductVariants);
        res.status(500).send(response);
        return response;
    }
};

export const getHomeInfo = async (req: Request, res: Response): Promise<HomeInfoResponse> => {
    const { status } = req.query;
    const IsActive = convertedStatusNumberFilter(Number(status));

    const search = mapCategoriesSearchQueryToDTO(req.query, IsActive);

    try {
        const response = await getHomeInfoService(search); // Obtener la respuesta directamente del servicio
        res.status(200).send(response);
        return response;
    } catch (error) {
        const response = new HomeInfoResponse(); // Crear una instancia solo en caso de error
        response.setError(Errors.Categories);
        res.status(500).send(response);
        return response;
    }
};


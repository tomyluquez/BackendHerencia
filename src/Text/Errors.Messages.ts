export enum Errors {
    Categories = "Error al cargar las categorias, por favor intente nuevamente.",
    Category = "Error al cargar la categoria, por favor intente nuevamente.",
    CategoryChangeState = "Error al cambiar de estado la categoria, por favor intente nuevamente.",
    CategorySave = "Error al guardar la categoria, por favor intente nuevamente.",
    CategoryNotFound = "La categoria no existe.",
    CategoryWhitProducts = "La categoria no puede ser desactivada porque tiene productos asociados.",

    ExistingName = "El nombre debe ser único, este nombre ya esta en uso.",

    Products = "Error al cargar los prodcutos, por favor intente nuevamente.",
    Product = "Error al cargar el producto , por favor intente nuevamente.",
    ProductChangeState = "Error al cambiar de estado el producto, por favor intente nuevamente.",
    ProductSave = "Error al guardar el producto, por favor intente nuevamente.",
    ProductNotFound = "El producto no existe.",
    ProductsNotFound = "No se encontraron productos.",
    ProductVariants = "Error al cargar el stock, por favor intente nuevamente.",

    IdRequired = "El id es requerido.",
    StatusRequired = "El status es requerido.",
    QuantityRequired = "La cantidad es requerida.",
    ActionRequired = "La accion es requerida.",

    UpdateStock = "Error al actualizar el stock, por favor intente nuevamente",

    Cart = "Error al cargar el carrito, por favor intente nuevamente.",
    CartUserNotFound = "El usuario no tiene carritos activos",
    CartEmpty = "El carrito esta vacio",
    CartItems = "Error al obtener los productos del carrito, por favor intente nuevamente.",
    CartItem = "Error al guardar el producto, por favor intente nuevamente.",
    CartItemNotFound = "El producto no existe.",

    HasNotStock = "No hay stock suficiente",
    NotSubstract = "No se puede restar menos de 0",

    Variant = "Error al cargar el stock"
}

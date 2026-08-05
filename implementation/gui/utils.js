export const Print =
    new Proxy(
        Object.create(null)
        , 
        {
            get(_, key) {
                return `${key}`;
            }
        }
    )
    ;
import {
  ProductOptionsProvider,
  MediaFile,
  useProductOptions,
  ProductPrice,
  BuyNowButton,
} from "@shopify/hydrogen";

export default function ProductDetails({ product }) {
  return (
    <ProductOptionsProvider data={product}>
      <section className="grid w-full gap-4 px-6 overflow-x-hidden md:gap-8 md:px-8 lg:px-12">
        <div className="grid items-start gap-6 lg:gap-20 md:grid-cols-2 lg:grid-cols-3">
          <div className="grid md:grid-flow-row md:p-0 md:overflow-x-auto md:grid-cols-2 md:w-full lg:col-span-2">
            <div className="md:col-span-2 snap-center card-image aspect-square md:w-full w-[80vw] shadow rounded">
              <ProductGallery media={product.media.nodes} />
            </div>
          </div>
          <div className="sticky md:mx-auto max-w-xl md:max-w-[24rem] grid gap-8 p-0 md:p-6 md:px-0 top-[6rem] lg:top-[8rem] xl:top-[10rem]">
            <div className="grid gap-2">
              <h1 className="text-4xl font-bold leading-10 whitespace-normal">
                {product.title}
              </h1>
              <span className="font-medium whitespace-pre-wrap opacity-50 max-w-prose inherit text-copy">
                {product.vendor}
              </span>
            </div>
            <ProductForm product={product} />
            <div className="mt-8">
              <div
                className="pt-6 prose text-black border-t border-gray-200 text-md"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </ProductOptionsProvider>
  );
}

function ProductForm({ product }) {
  const { options, selectedVariant } = useProductOptions();

  const isOutOfStock = !selectedVariant?.availableForSale || false;
  return (
    <form className="grid gap-10">
      {
        <div className="grid gap-4">
          {options.map(({ name, values }) => {
            if (values.length === 1) {
              return null;
            }
            return (
              <div
                key={name}
                className="flex flex-wrap items-baseline justify-start gap-6"
              >
                <legend className="whitespace-pre-wrap max-w-prose font-bold text-lead min-w-[4rem]">
                  {name}
                </legend>
                <div className="flex flex-wrap items-baseline gap-4">
                  <OptionRadio name={name} values={values} />
                </div>
              </div>
            );
          })}
        </div>
      }
      <div>
        <ProductPrice
          className="text-lg font-semibold text-gray-500 line-through"
          priceType="compareAt"
          variantId={selectedVariant.id}
          data={product}
        />
        <ProductPrice
          className="text-lg font-semibold text-gray-900"
          variantId={selectedVariant.id}
          data={product}
        />
      </div>
      <div className="grid items-stretch gap-4">
        {isOutOfStock ? (
          <span className="px-6 py-3 leading-none text-center text-black border rounded-sm ">
            Available in 2-3 weeks
          </span>
        ) : (
          <BuyNowButton variantId={selectedVariant.id}>
            <span className="inline-block w-full max-w-xl px-6 py-3 font-medium leading-none text-center text-white bg-black border rounded-sm">
              Buy it now
            </span>
          </BuyNowButton>
        )}
      </div>
    </form>
  );
}

function OptionRadio({ values, name }) {
  const { selectedOptions, setSelectedOption } = useProductOptions();

  return (
    <>
      {values.map((value) => {
        const checked = selectedOptions[name] === value;
        const id = `option-${name}-${value}`;

        return (
          <label key={id} htmlFor={id}>
            <input
              className="sr-only"
              type="radio"
              id={id}
              name={`option[${name}]`}
              value={value}
              checked={checked}
              onChange={() => setSelectedOption(name, value)}
            />
            <div
              className={`leading-none border-b-[2px] py-1 cursor-pointer transition-all duration-200 ${
                checked ? "border-gray-500" : "border-neutral-50"
              }`}
            >
              {value}
            </div>
          </label>
        );
      })}
    </>
  );
}

function ProductGallery({ media }) {
  if (!media.length) {
    return null;
  }

  return (
    <div
      className={`grid gap-4 overflow-x-scroll grid-flow-col md:grid-flow-row  md:p-0 md:overflow-x-auto md:grid-cols-2 w-screen md:w-full lg:col-span-2`}
    >
      {media.map((med, i) => {
        let extraProps = {};

        if (med.mediaContentType === "MODEL_3D") {
          extraProps = {
            interactionPromptThreshold: "0",
            ar: true,
            loading: "eager",
            disableZoom: true,
          };
        }

        const data = {
          ...med,
          image: {
            ...med.image,
            altText: med.alt || "Product image",
          },
        };

        return (
          <div
            className={`${
              i % 3 === 0 ? "md:col-span-2" : "md:col-span-1"
            } snap-center card-image bg-white aspect-square md:w-full w-[80vw] shadow-sm rounded`}
            key={med.id || med.image.id}
          >
            <MediaFile
              tabIndex="0"
              className={`w-full h-full aspect-square object-cover`}
              data={data}
              options={{
                crop: "center",
              }}
              {...extraProps}
            />
          </div>
        );
      })}
    </div>
  );
}

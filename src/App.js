import { useState } from "react";

// Kullanıcının kart detaylarını ve fatura adresini görüntülemesine ve düzenlemesine olanak sağlıyoruz.
// Görevler:
// 1. Fatura adresini (ülke ve posta kodu) güncellemeyi mümkün kılın.
//    - Kullanıcı fatura adresinde değişiklik yaptığında, "card" state'i uygun şekilde güncellenmelidir.
//    - Mevcut kart bilgileri (numara, son kullanım tarihi ve CVC) bozulmadan kalmalıdır.
// 2. Ülke ve posta kodu alanlarının varsayılan değerleri mevcut state bilgilerine dayanmalıdır.
// 3. Kullanıcı fatura adresini değiştirdiğinde  görsel geri bildirim alın (başarı mesajı veya güncellemenin yapıldığını belirten bir işaret).
// 4. Kullanıcı postal kodu alanına geçersiz bir değer (yalnızca harfler gibi) girdiğinde hata mesajı gösterin.

// Bonus:
// - Kullanıcı posta kodu alanını düzenlerken, postal kodun belirli bir formatta olmasını sağlamak için gerçek zamanlı doğrulama ekleyin (yalnızca sayılar kabul edilir gibi).
// - Kullanıcı ülke seçimini değiştirdiğinde postal kodu alanı otomatik olarak temizlensin.
// - Kart bilgileri (numara, tarih, CVC) yalnızca okunabilir ancak görsel olarak düzenlenebilir gibi görünsün (örneğin, üstüne tıklayınca seçilebilir metin kutusu gibi).

// Tailwind ile ilgili istekler:
// 1. Fatura adresi bölümü için daha belirgin çerçeve veya arka plan stili ekleyin (örneğin hafif gölge, arka plan rengi veya kenar çizgisi).
// 2. Kullanıcı giriş alanına tıkladığında (focus durumu), alanın kenar rengini ve arka plan rengini değiştirerek daha fazla görsel geri bildirim sağlayın.
// 3. Ülke seçim kutusunda aktif seçenek (hover veya seçili durum) için daha fazla vurgu ekleyin (örneğin farklı bir arka plan rengi veya metin rengi).
// 4. Hata mesajlarını göstermek için Tailwind'in uyarı renklerinden yararlanın (örneğin kırmızı metin ve simgeler).

export default function CardDetails() {
  const [card, setCard] = useState({
    number: "4242424242424242",
    expiration: "04/26",
    cvc: "424",
    country: "Türkiye",
    postalCode: "42424",
  });

  const [posta, setPosta] = useState(card.postalCode);
  const [country, setCountry] = useState(card.country);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

 
  const handlePostalChange = (e) => {
    const value = e.target.value;
    setPosta(value);

    if (/^\d+$/.test(value)) {
      setError("");
      setSuccess(true);
      setCard((prev) => ({
        ...prev,
        postalCode: value,
      }));
    } else {
      setSuccess(false);
      setError("Posta kodu sadece sayılardan oluşmalıdır!");
    }
  };


  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    setCountry(newCountry);
    setPosta("");
    setError("");
    setSuccess(false);
    setCard((prev) => ({
      ...prev,
      country: newCountry,
      postalCode: "",
    }));
  };

  return (
    <div className="py-4 max-w-sm mx-auto">
     
      <fieldset>
        <legend className="block text-sm font-medium leading-6 text-gray-900">
          Kart Detayları
        </legend>
        <div className="mt-2 -space-y-px rounded-md bg-white shadow-md">
          
          <input
            readOnly
            value={card.number}
            className="px-2 relative block w-full rounded-none rounded-t-md border-0 bg-gray-50 py-1.5 text-gray-500 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 cursor-text select-text"
          />
          <div className="flex -space-x-px">
            
            <input
              readOnly
              value={card.expiration}
              className="px-2 relative block w-full rounded-none border-0 bg-gray-50 py-1.5 text-gray-500 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 cursor-text select-text"
            />
        
            <input
              readOnly
              value={card.cvc}
              className="px-2 relative block w-full rounded-none border-0 bg-gray-50 py-1.5 text-gray-500 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 cursor-text select-text"
            />
          </div>
        </div>
      </fieldset>

      
      <fieldset className="mt-6  p-3 rounded-md ">
        <legend className="block text-sm font-medium leading-6 text-gray-900 mb-2">
          Fatura Adresi
        </legend>
        <div className="mt-2 -space-y-px rounded-md shadow-sm">
          
          <div>
            <label htmlFor="country" className="sr-only">
              Ülke
            </label>
            <select
              id="country"
              name="country"
              className="relative block w-full rounded-none rounded-t-md border-0 bg-white py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 px-1 hover:bg-indigo-50 focus:bg-indigo-50"
              value={country}
              onChange={handleCountryChange}
            >
              <option value="İtalya">İtalya</option>
              <option value="Türkiye">Türkiye</option>
              <option value="Meksika">Meksika</option>
            </select>
          </div>

         
          <div>
            <label htmlFor="postal-code" className="sr-only">
              ZIP / Posta kodu
            </label>
            <input
              type="text"
              name="postal-code"
              id="postal-code"
              className="px-2 relative block w-full rounded-none rounded-b-md border-0 bg-white py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:bg-indigo-50"
              placeholder="ZIP / Posta kodu"
              value={posta}
              onChange={handlePostalChange}
            />

           
            {error && <p className="text-red-600 text-sm mt-1">❌ {error}</p>}
            {success && !error && posta && (
              <p className="text-green-600 text-sm mt-1">
                ✅ Geçerli posta kodu!
              </p>
            )}
          </div>
        </div>
      </fieldset>
    </div>
  );
}

import { db } from "@/firebase/firebase.config";
import {
  AddressDB,
  CardDB,
  CustomerDB,
  CustomerHasAddresses,
  PackageDB,
  RestaurantDB,
} from "@/infraestructure/database/tables";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit,
  orderBy,
  Query,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export const saveAddress = async (address: AddressDB) => {
  try {
    const docRef: DocumentReference = await addDoc(
      collection(db, "addresses"),
      address
    );
    console.log("Direccion guardada con ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const deleteAddress = async (idAddress: string | string[]) => {
  try {
    await deleteDoc(doc(db, "addresses", idAddress as string));
    const relQuery: Query = query(
      collection(db, "customerHasAddresses"),
      where("idAddress", "==", idAddress)
    );
    const relSnapshot: QuerySnapshot = await getDocs(relQuery);

    const deletePromises = relSnapshot.docs.map((document) =>
      deleteDoc(doc(db, "customerHasAddresses", document.id))
    );
    await Promise.all(deletePromises);
  } catch (error) {
    throw error;
  }
};

export const saveCustomerAddress = async (
  address: AddressDB,
  idCustomer: string
) => {
  try {
    const id = await saveAddress(address);

    const docRef: DocumentReference = await addDoc(
      collection(db, "customerHasAddresses"),
      {
        idAddress: id,
        idCustomer: idCustomer,
      }
    );
  } catch (error) {
    throw error;
  }
};

export const getCustomerAddresses = async (
  idCustomer: string
): Promise<AddressDB[] | null> => {
  try {
    const relQuery: Query = query(
      collection(db, "customerHasAddresses"),
      where("idCustomer", "==", idCustomer)
    );
    const relSnapshot: QuerySnapshot = await getDocs(relQuery);

    const addressIds = relSnapshot.docs.map(
      (doc) => (doc.data() as CustomerHasAddresses).idAddress
    );

    const addressPromises = addressIds.map(async (id) => {
      const addressRef: DocumentReference = doc(db, "addresses", id);
      const addressSnap: DocumentSnapshot = await getDoc(addressRef);

      if (addressSnap.exists()) {
        const address: AddressDB = addressSnap.data() as AddressDB;
        address.id = addressSnap.id;
        return address;
      }
      return null;
    });
    const addresses: (AddressDB | null)[] = await Promise.all(addressPromises);
    return addresses.filter((addr): addr is AddressDB => addr != null);
  } catch (error) {
    throw error;
  }
};

export const saveRestaurant = async (restaurant: RestaurantDB) => {
  try {
    const docRef: DocumentReference = await addDoc(
      collection(db, "restaurants"),
      restaurant
    );
    console.log("Direccion guardada con ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getCustomer = async (email: string): Promise<CustomerDB> => {
  try {
    const q: Query = query(
      collection(db, "customers"),
      where("email", "==", email)
    );
    const querySnapshot: QuerySnapshot = await getDocs(q);

    const customer: CustomerDB = querySnapshot.docs[0].data() as CustomerDB;
    customer.id = querySnapshot.docs[0].id;

    return customer;
  } catch (error) {
    throw error;
  }
};

export const updateCustomer = async (
  name: string,
  lastName: string,
  phone: string,
  idCustomer: string
) => {
  const customerRef = doc(db, "customers", idCustomer);
  try {
    await updateDoc(customerRef, {
      name,
      lastName,
      phone,
    });
  } catch (error) {
    throw error;
  }
};
export const saveCard = async (card: CardDB) => {
  try {
    const docRef: DocumentReference = await addDoc(
      collection(db, "cards"),
      card
    );
    console.log("Direccion guardada con ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getCards = async (id: string): Promise<CardDB[] | null> => {
  try {
    const q: Query = query(
      collection(db, "cards"),
      where("idCustomer", "==", id)
    );
    const querySnapshot: QuerySnapshot = await getDocs(q);
    const cards: CardDB[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as CardDB;
      data.id = doc.id;
      return data;
    });
    return cards;
  } catch (error) {
    throw error;
  }
};

export const udpateCard = async (idCard: string | null, card: CardDB) => {
  if (idCard) {
    const cardRef = doc(db, "cards", idCard);
    try {
      await setDoc(cardRef, card);
    } catch (error) {
      throw error;
    }
  }
};

export const deleteCard = async (idCard: string | null) => {
  if (idCard) {
    try {
      await deleteDoc(doc(db, "cards", idCard));
    } catch (error) {
      throw error;
    }
  }
};

export const savePackages = (packages: PackageDB[]) => {
  try {
    packages.map(async (item, index) => {
      const packRef: DocumentReference = await addDoc(
        collection(db, "packages"),
        item
      );
      console.log("Documento guardado", packRef.id);
    });
  } catch (error) {
    throw error;
  }
};

export const getPackages = async (quantity: number, order: string): Promise<PackageDB[] | null> => {
  try {
    const q: Query = query(
      collection(db, "packages"),
      orderBy(order, 'desc'),
      limit(quantity)
    );

    const querySnapshot: QuerySnapshot = await getDocs(q);

    const packages: PackageDB[] = querySnapshot.docs.map((item) => {
      const pack: PackageDB = item.data() as PackageDB;
      pack.id = item.id;
      return pack;
    });

    const restaurantIds = [...new Set(packages.map((p) => p.idRestaurant))];

    const restaurantPromises = restaurantIds.map(async (id) => {
      const restaurantRef = doc(db, "restaurants", id);
      const restaurantSnap = await getDoc(restaurantRef);
      if (restaurantSnap.exists()) {
        const restaurantData = restaurantSnap.data() as RestaurantDB;
        restaurantData.id = restaurantSnap.id;
        return restaurantData;
      }
      return null;
    });

    const restaurantResults = await Promise.all(restaurantPromises);
    const restaurantMap = new Map<string, RestaurantDB>();

    restaurantResults.forEach((res) => {
      if (res) {
        restaurantMap.set(res.id!, res);
      }
    });
    const enrichedPackages = packages.map((pkg) => ({
      ...pkg,
      restaurant: restaurantMap.get(pkg.idRestaurant) || null,
    }));

    return enrichedPackages;
  } catch (error) {
    throw error;
  }
};

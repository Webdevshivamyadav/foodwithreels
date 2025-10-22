import React, { useContext, useEffect } from 'react'
import {FetchItemContext} from '../../context/FoodPartnerContext/FetchItem'
import { Edit,Trash2 } from 'lucide-react';

const Item = () => {
  const {items,fetchFoodItems} = useContext(FetchItemContext);
  
  const foodPartner = JSON.parse(sessionStorage.getItem("foodPartner"));
  

  useEffect(()=>{
     fetchFoodItems(foodPartner._id);
  },[])


  return (
      <>
        {items.length > 0 ? (
        items.map((food) => (
          <tr key={food._id} className="border-b hover:bg-gray-50">
            <td className="p-3">{food.name}</td>
            <td className="p-3">{food.description}</td>
            <td className="p-3 font-semibold text-green-600">₹{food.price}</td>
            <td className="p-3">
              {food.videoUrl ? (
                <video src={food.videoUrl} className="w-24 rounded" controls />
              ) : (
                "—"
              )}
            </td>
            <td className="p-3 flex gap-3">
              <button className="text-blue-500 hover:text-blue-700 cursor-pointer">
                <Edit size={18} />
              </button>
              <button
                onClick={() => handleDeleteFood(food._id)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <Trash2 size={18} />
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="p-4 text-center text-gray-500">
            No food items added yet.
          </td>
        </tr>
      )}
   </>
  )
}

export default Item
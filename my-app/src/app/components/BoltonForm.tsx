"use client"
import { useState } from 'react';
import styles from './BoltonForm.module.css'
import { useRouter } from 'next/navigation'


interface FormData {
    itemName: string;
    foodQuality: number;
    cleanliness: number;
    variety: number;
    service: number;
    comments: string;
  }
  
  export default function BoltonForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
      itemName: '',
      foodQuality: 3,
      cleanliness: 3,
      variety: 3,
      service: 3,
      comments: '',
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'foodQuality' || name === 'cleanliness' || name === 'variety' || name === 'service' 
          ? Number(value)
          : value,
      }));
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('Submitted data:', formData);
      setFormData({
        itemName: '',
        foodQuality: 3,
        cleanliness: 3,
        variety: 3,
        service: 3,
        comments: '',
      });
        router.push('/');
      
    };
  
    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.ratingForm}>
          <h2 className={styles.header}>Rate Bolton Dining Hall</h2>
  
          <label className={styles.label}>
            Favorite foods:
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              placeholder="Enter the name of the food items"
              className={styles.input}
              required
            />
          </label>
  
          <label className={styles.label}>
            Food Quality:
            <input
              type="range"
              name="foodQuality"
              min="1"
              max="5"
              value={formData.foodQuality}
              onChange={handleChange}
              className={styles.range}
            />
          </label>
  
          <label className={styles.label}>
            Cleanliness:
            <input
              type="range"
              name="cleanliness"
              min="1"
              max="5"
              value={formData.cleanliness}
              onChange={handleChange}
              className={styles.range}
            />
          </label>
  
          <label className={styles.label}>
            Variety:
            <input
              type="range"
              name="variety"
              min="1"
              max="5"
              value={formData.variety}
              onChange={handleChange}
              className={styles.range}
            />
          </label>
  
          <label className={styles.label}>
            Service:
            <input
              type="range"
              name="service"
              min="1"
              max="5"
              value={formData.service}
              onChange={handleChange}
              className={styles.range}
            />
          </label>
  
          <label className={styles.label}>
            Additional Comments about Bolton:
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Share any additional feedback about Bolton Dining Hall"
              className={styles.textarea}
            />
          </label>
  
          <button type="submit" className={styles.submitButton}>Submit Rating for Bolton</button>
        </form>
      </div>
    );
  }
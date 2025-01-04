<img src="./frontend/src/assets/logo-light.png" alt="EngageLens Logo" width="100px">


# EngageLens by Team ANiMAXiO 

A powerful social media analytics platform that provides deep insights into your social media engagement through an AI-powered lens. Built for the **Level Supermind Hackathon**, EngageLens leverages **DataStax Astra DB** and **Langflow** to analyze engagement data and deliver actionable insights.  

---

## 👁️ About EngageLens  

EngageLens is your intelligent companion for social media analytics, helping you:  
- Analyze engagement patterns across different post types.  
- Generate AI-powered insights for content optimization.  
- Visualize performance metrics through an intuitive dashboard.  
- Track and compare metrics across various content formats.  

---

## 🌟 Key Features  

### **📊 Smart Analytics Dashboard**  
- Real-time engagement tracking.  
- Interactive data visualization.  
- Historical trend analysis.  
- Performance comparisons.  

### **🤖 AI-Powered Insights**  
- GPT-generated content recommendations.  
- Engagement pattern detection.  
- Performance prediction.  
- Content optimization suggestions.  

### **📈 Post Type Analysis**  
- Comprehensive comparison across:  
  - Carousel posts.  
  - Reels.  
  - Static images.  
  - Stories.  

---

## 🛠️ Tech Stack  

- **DataStax Astra DB**: For database management and operations.  
- **Langflow**: For workflow creation and GPT integration.  
- **OpenAI GPT**: To generate AI-driven insights.  
- **React**: For building the user interface and analytics dashboard.
- **Python**: Backend scripting for data management and analysis.  

---

## 📂 Project Structure  

```plaintext
├── data/
│   └── mock_data.json            # Sample engagement data
├── src/
│   ├── db_setup.py               # Database schema creation script
│   ├── data_insert.py            # Script to insert mock data
│   ├── fetch_data.py             # Script to query Astra DB
├── workflows/
│   └── social_analytics.json     # Langflow workflow file
├── README.md                     # Project documentation
```


## 🏗️ How to Get Started
1. Clone the Repository
```bash
git clone https://github.com/sudo-Satvik/engage-lens.git
cd EngageLens
```

2. Install Dependencies
```bash
pip install cassandra-driver
```
Follow Langflow [documentation](https://docs.langflow.org/) to set up Langflow.

3. Set Up **DataStax Astra DB**
Sign up at DataStax Astra.
Create a database and download the secure connect bundle.
Place the secure connect bundle in the project directory.

4. Configure the Database
Run the **db_setup.py** script in the **src/** folder to set up the schema. Then insert mock data using **data_insert.py**.

5. Run Langflow Workflow
Open Langflow.
Load the workflow file from workflows/social_analytics.json.
Test the workflow by entering different post types as input and observe the insights.


## 🎯 Vision
EngageLens aims to revolutionize how creators and businesses understand and optimize their social media performance. By combining cutting-edge AI technology with robust analytics, we provide insights that are not just data points, but actionable strategies for growth.

## 👥 Team ANiMAXiO
Meet the minds behind EngageLens:

- [Devendra Kumar](https://github.com/KumaDevendra/)
- [Sahil Sharma](https://github.com/SAHIL-Sharma21/)
- [Satvik Sharma](https://github.com/sudo-Satvik/)

<hr>
<h3>Created with ❤️ by Team ANiMAXiO</h3>
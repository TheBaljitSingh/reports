# NGO Reports Management System

A scalable web application for NGOs to submit monthly reports individually or in bulk, with an admin dashboard for tracking and summarizing data.

## Tech Stack

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose** for database
- **BullMQ** with **Redis** for background job processing
- **Cloudinary** for file storage
- **Multer** for file uploads

### Frontend
- **React.js** with modern hooks
- **Axios** for API calls
- **CSS3** for styling

## Features

### ✅ Completed Features
- **Single Report Submission**: Submit individual monthly reports
- **Bulk CSV Upload**: Upload multiple reports via CSV with background processing
- **Real-time Progress Tracking**: Monitor CSV processing progress (e.g., "12 out of 20 completed")
- **Admin Dashboard**: View aggregated data with month filtering
- **Job Status API**: Track background job processing status
- **Database Idempotency**: Prevents duplicate reports from same NGO/month
- **Error Handling**: Graceful handling of partial failures in CSV processing

### 📊 Dashboard Features
- Total NGOs reporting
- Total people helped
- Total events conducted
- Total funds utilized
- Month-based filtering
- Recent reports table

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Redis server

### Backend Setup

1. **Clone and navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the server directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/ngo-reports
   PORT=3000
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

4. **Start Redis server:**
   ```bash
   redis-server
   ```

5. **Start MongoDB:**
   ```bash
   mongod
   ```

6. **Run the server:**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend:**
   ```bash
   npm start
   ```

4. **Access the application:**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000

## API Endpoints

### Reports
- `POST /api/v1/report` - Submit single report
- `POST /api/v1/reports/upload` - Upload CSV file (returns job ID)
- `GET /api/v1/job-status/:jobId` - Get job processing status
- `GET /api/v1/dashboard?month=YYYY-MM` - Get dashboard data

### Example API Usage

**Submit Single Report:**
```bash
curl -X POST http://localhost:3000/api/v1/report \
  -H "Content-Type: application/json" \
  -d '{
    "ngoId": "68bb213f998ad3d67e1d8d6f",
    "month": "2024-01",
    "peopleHelped": 100,
    "eventsConducted": 5,
    "fundsUtilized": 50000
  }'
```

**Upload CSV:**
```bash
curl -X POST http://localhost:3000/api/v1/reports/upload \
  -F "file=@reports.csv"
```

**Check Job Status:**
```bash
curl http://localhost:3000/api/v1/job-status/csv_12345
```

**Get Dashboard Data:**
```bash
curl http://localhost:3000/api/v1/dashboard?month=2024-01
```

## CSV Format

The CSV file should have the following columns:
```csv
ngoId,month,peopleHelped,eventsConducted,fundsUtilized
68bb213f998ad3d67e1d8d6f,2024-01,100,5,50000
68bb213f998ad3d67e1d8d6f,2024-02,150,8,75000
```

## Architecture Decisions

### Background Processing
- Used **BullMQ** with **Redis** for scalable background job processing
- Jobs are processed asynchronously to handle large CSV files
- Real-time progress tracking with detailed status updates

### Database Design
- **MongoDB** with compound unique index on `ngoId + month` for idempotency
- Prevents duplicate reports from the same NGO for the same month
- Aggregation pipelines for efficient dashboard data calculation

### Error Handling
- Graceful handling of partial failures in CSV processing
- Individual row failures don't stop the entire job
- Detailed error logging and user feedback

### Scalability Considerations
- Queue-based architecture can handle high volumes
- Database indexing for performance
- File storage via Cloudinary for scalability

## AI Tools Used

- **Cursor AI**: Used for code generation, debugging, and architectural guidance
- **GitHub Copilot**: Assisted with boilerplate code and API implementations

## Production Improvements

With more time, I would implement:

1. **Authentication & Authorization**: JWT-based auth for admin dashboard
2. **Input Validation**: Comprehensive validation middleware
3. **Rate Limiting**: Prevent API abuse
4. **Logging**: Structured logging with Winston
5. **Monitoring**: Health checks and metrics
6. **Testing**: Unit and integration tests
7. **Docker**: Containerization for easy deployment
8. **CI/CD**: Automated testing and deployment pipeline
9. **Database Optimization**: Connection pooling and query optimization
10. **Security**: Input sanitization and CORS configuration

## Demo

The application provides:
- Clean, responsive UI for all features
- Real-time progress tracking for bulk uploads
- Comprehensive dashboard with filtering
- Error handling and user feedback
- Mobile-friendly design

## License

This project is created for the SDE I/II Take Home Assignment.

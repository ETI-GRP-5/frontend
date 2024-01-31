package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"cloud.google.com/go/firestore"
	"cloud.google.com/go/storage"
	firebase "firebase.google.com/go"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"google.golang.org/api/option"
)

// FileInfo struct
type FileInfo struct {
	Name     string `json:"File Name"`
	FilePath string `json:"File Path"`
}

const (
	projectID     = "eti-assignment-1"
	storageBucket = "eti-assignment-1.appspot.com"
	//C:\Users\kwek9\Desktop\Emerging Trends in IT\Final Assignment\ETI-Grp-5\src\firebaseConfig.js
	firebaseConfig = "../../src/serviceKey.json"
)

func main() {
	router := mux.NewRouter()
	corsOptions := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
	})
	handler := corsOptions.Handler(router)
	if err := initFirebase(); err != nil {
		log.Fatal("Error initializing Firebase:", err)
	}
	// Routes
	router.HandleFunc("/resource", uploadHandler).Methods("POST")

	fmt.Println("Listening at port 5050")
	log.Fatal(http.ListenAndServe(":5050", handler))
}

var storageClient *storage.Client
var firestoreClient *firestore.Client

// initialize firebase
func initFirebase() error {
	ctx := context.Background()

	opt := option.WithCredentialsFile(firebaseConfig)
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		return fmt.Errorf("error initializing Firebase app: %v", err)
	}

	// Use storage.NewClient to create a Cloud Storage client
	client, err := storage.NewClient(ctx, option.WithCredentialsFile(firebaseConfig))
	if err != nil {
		return fmt.Errorf("error initializing Cloud Storage client: %v", err)
	}

	// Use firestore.NewClient to create a Firestore client
	firestoreClient, err = firestore.NewClient(ctx, projectID, option.WithCredentialsFile(firebaseConfig))
	if err != nil {
		return fmt.Errorf("error initializing Firestore client: %v", err)
	}

	storageClient = client
	fmt.Println("Option:", opt)
	fmt.Println("App:", app)
	return nil
}

func uploadHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	file, header, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Error retrieving file from form: "+err.Error(), http.StatusBadRequest)
		return
	}
	defer file.Close()

	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()

	bucket := storageClient.Bucket(storageBucket)

	if err != nil {
		http.Error(w, "Error getting bucket: "+err.Error(), http.StatusInternalServerError)
		return
	}

	objectName := "resource/" + header.Filename

	wc := bucket.Object(objectName).NewWriter(ctx)
	defer wc.Close()

	if _, err := io.Copy(wc, file); err != nil {
		http.Error(w, "Error uploading file to Firebase Storage: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Add file info to Firestore
	fileInfo := FileInfo{
		Name:     header.Filename,
		FilePath: fmt.Sprintf("gs://%s/%s", storageBucket, objectName),
	}

	if err := addFileInfoToFirestore(ctx, fileInfo); err != nil {
		http.Error(w, fmt.Sprintf(`{"error": "Error adding file info to Firestore: %s"}`, err.Error()), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "File uploaded successfully"}`))
}

// helper function to add fileinfo to firestore
func addFileInfoToFirestore(ctx context.Context, fileInfo FileInfo) error {
	// Assuming you have a Firestore collection named "files"
	docRef, _, err := firestoreClient.Collection("resource").Add(ctx, fileInfo)
	if err != nil {
		return fmt.Errorf("error adding file info to Firestore: %v", err)
	}

	fmt.Printf("File info added to Firestore with ID: %s\n", docRef.ID)
	return nil
}

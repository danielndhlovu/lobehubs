package main
import ( "encoding/json"; "fmt"; "log"; "net/http" )
type Message struct { Role string \`json:"role"\`; Content string \`json:"content"\` }
type ChatRequest struct { Message string \`json:"message"\`; Model string \`json:"model"\`; SessionID string \`json:"session_id"\`; History []Message \`json:"history"\` }
type ChatResponse struct { Reply string \`json:"reply"\` }
func chatHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
    w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
    w.Header().Set("Content-Type", "application/json")
    if r.Method == http.MethodOptions { w.WriteHeader(http.StatusOK); return }
    if r.Method != http.MethodPost { http.Error(w, "method not allowed", http.StatusMethodNotAllowed); return }
    var req ChatRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil { http.Error(w, "bad request", http.StatusBadRequest); return }
    log.Printf("[%s] model=%s msg=%q\\n", req.SessionID, req.Model, req.Message)
    reply := fmt.Sprintf("Go echo [model: %s]: %s", req.Model, req.Message)
    json.NewEncoder(w).Encode(ChatResponse{Reply: reply})
}
func main() {
    http.HandleFunc("/api/chat", chatHandler)
    log.Println("Go backend listening on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

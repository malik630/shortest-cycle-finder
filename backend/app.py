from flask import Flask, request, jsonify
from flask_cors import CORS
from graph_algorithms import process_graph_input

app = Flask(__name__)
CORS(app)

@app.route('/api/find-shortest-cycle', methods=['POST'])
def find_shortest_cycle():
    """
    Endpoint pour trouver le plus court cycle.
    
    Expected JSON:
    {
        "vertices": 5,
        "edges": [[0, 1], [1, 2], [2, 0], [2, 3], [3, 4]]
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'vertices' not in data or 'edges' not in data:
            return jsonify({
                'error': 'Format invalide. Attendu: {"vertices": n, "edges": [[u, v], ...]}'
            }), 400
        
        num_vertices = data['vertices']
        edges = data['edges']
        
        # Validation
        if num_vertices < 0:
            return jsonify({'error': 'Le nombre de sommets doit être positif'}), 400
        
        if not isinstance(edges, list):
            return jsonify({'error': 'Les arêtes doivent être une liste'}), 400
        
        # Convertir les arêtes en tuples d'entiers
        processed_edges = []
        for edge in edges:
            if len(edge) != 2:
                return jsonify({'error': f'Arête invalide: {edge}'}), 400
            u, v = int(edge[0]), int(edge[1])
            if u < 0 or u >= num_vertices or v < 0 or v >= num_vertices:
                return jsonify({'error': f'Sommet hors limites: {edge}'}), 400
            if u != v:  # Éviter les boucles simples
                processed_edges.append((u, v))
        
        # Trouver le plus court cycle
        result = process_graph_input(processed_edges, num_vertices)
        
        return jsonify(result), 200
        
    except ValueError as e:
        return jsonify({'error': f'Erreur de validation: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': f'Erreur serveur: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'message': 'Backend is running'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
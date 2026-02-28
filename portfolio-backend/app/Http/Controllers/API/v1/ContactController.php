<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Store a new contact message.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|min:10',
        ]);

        $contact = Contact::create($validated);

        return response()->json([
            'message' => 'Message sent successfully!',
            'data'    => $contact,
        ], 201);
    }

    /**
     * Return all contact messages (admin use).
     */
    public function index()
    {
        return response()->json(
            Contact::orderByDesc('created_at')->get()
        );
    }

    /**
     * Mark a contact message as read.
     */
    public function markAsRead($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->update(['is_read' => true]);

        return response()->json($contact);
    }

    /**
     * Delete a contact message.
     */
    public function destroy($id)
    {
        Contact::findOrFail($id)->delete();

        return response()->json(['message' => 'Contact message deleted successfully.']);
    }
}

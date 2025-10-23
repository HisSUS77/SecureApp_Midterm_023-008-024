import dbConnect from "@/utils/dbConnect";
import Project from "@/models/project";

export async function POST(req) {
  await dbConnect(); // Connect to MongoDB
  try {
    const { title, description, githubLink } = await req.json();
    const newProject = await Project.create({ title, description, githubLink });
    return new Response(JSON.stringify({ success: true, project: newProject }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

export async function GET() {
  await dbConnect(); // Connect to MongoDB
  try {
    const projects = await Project.find({});
    return new Response(JSON.stringify({ success: true, projects }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}


export async function PUT(req) {
  await dbConnect(); // Connect to MongoDB
  try {
    const { id, title, description } = await req.json(); // Get updated project data from request
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description },
      { new: true } // Return the updated project
    );
    return new Response(
      JSON.stringify({ success: true, project: updatedProject }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}



export async function DELETE(req) {
  await dbConnect(); // Connect to MongoDB
  try {
    const { id } = await req.json(); // Get project ID from request body
    await Project.findByIdAndDelete(id); // Delete the project from MongoDB
    return new Response(
      JSON.stringify({ success: true, message: "Project deleted successfully" }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}


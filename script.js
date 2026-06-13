const SUPABASE_URL = "https://ejntsmipxvestvaiiaxk.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_TLRDLYkRuYbAj5b07Rhh7w_36YledRG";

let supabaseClient = null;

function initSupabase() {
  if (window.supabase) {
    supabaseClient = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY
    );
  }
}

window.addEventListener("load", () => {
  initSupabase();
  loadCourses();
});
